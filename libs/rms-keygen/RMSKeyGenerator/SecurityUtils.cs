using Security;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Management;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace RMSKeyGenerator
{
    class SecurityUtils
    {
        public string GetClientCode()
        {
            string empty = string.Empty;
            string result = string.Empty;
            empty = GetProcessorID() + GetDiskDriveSignature();
            if (empty.Length > 0)
            {
                result = FormatKey(EncodeMD5(empty));
            }
            return result;
        }

        public string GetProcessorID()
        {
            string result = string.Empty;
            try
            {
                ManagementObjectSearcher srch = new ManagementObjectSearcher("select * from Win32_Processor");
                result = GetPropertyValue(srch, "ProcessorId");
            }
            catch
            {
            }
            return result;
        }

        public string GetDiskDriveSignature()
        {
            ManagementObjectSearcher managementObjectSearcher = new ManagementObjectSearcher("\\root\\cimv2", "select * from Win32_DiskPartition WHERE BootPartition=True");
            uint num = 999u;
            using (ManagementObjectCollection.ManagementObjectEnumerator managementObjectEnumerator = managementObjectSearcher.Get().GetEnumerator())
            {
                if (managementObjectEnumerator.MoveNext())
                {
                    ManagementObject managementObject = (ManagementObject)managementObjectEnumerator.Current;
                    num = Convert.ToUInt32(managementObject.GetPropertyValue("Index"));
                }
            }
            if (num == 999)
            {
                return string.Empty;
            }
            managementObjectSearcher = new ManagementObjectSearcher("SELECT * FROM Win32_DiskDrive where Index = " + num);
            string text = "";
            using (ManagementObjectCollection.ManagementObjectEnumerator managementObjectEnumerator = managementObjectSearcher.Get().GetEnumerator())
            {
                if (managementObjectEnumerator.MoveNext())
                {
                    ManagementObject managementObject2 = (ManagementObject)managementObjectEnumerator.Current;
                    text = managementObject2.GetPropertyValue("Name").ToString();
                }
            }
            if (string.IsNullOrEmpty(text.Trim()))
            {
                return string.Empty;
            }
            if (text.StartsWith("\\\\.\\"))
            {
                text = text.Replace("\\\\.\\", "%");
            }
            managementObjectSearcher = new ManagementObjectSearcher("SELECT * FROM Win32_PhysicalMedia WHERE Tag like '" + text + "'");
            string result = string.Empty;
            using (ManagementObjectCollection.ManagementObjectEnumerator managementObjectEnumerator = managementObjectSearcher.Get().GetEnumerator())
            {
                if (managementObjectEnumerator.MoveNext())
                {
                    ManagementObject managementObject2 = (ManagementObject)managementObjectEnumerator.Current;
                    result = managementObject2.GetPropertyValue("SerialNumber").ToString();
                }
            }
            return result;
        }

        private static string FormatKey(string TobeFormat)
	    {
		    if (!string.IsNullOrEmpty(TobeFormat) && TobeFormat.Length >= 4)
		    {
			    uint num = (uint)TobeFormat.Length / 4u;
			    for (uint num2 = 0u; num2 < num - 1; num2++)
			    {
				    TobeFormat = TobeFormat.Insert((int)((num2 + 1) * 4 + num2), "-");
			    }
		    }
		    return TobeFormat;
	    }

	    public string PadString(string InputString, int TotalLength)
	    {
		    InputString = ((InputString.Length <= TotalLength) ? InputString.PadRight(TotalLength, '0') : InputString.Substring(0, TotalLength));
		    return InputString;
	    }

	    private string EncodeMD5(string TobeEncode)
	    {
		    MD5 mD = new MD5CryptoServiceProvider();
		    if (!string.IsNullOrEmpty(TobeEncode))
		    {
			    TobeEncode = TobeEncode.Replace("_", "");
			    int discarded;
			    byte[] bytes = HexEncoding.GetBytes(TobeEncode, out discarded);
			    byte[] array = mD.ComputeHash(bytes);
			    TobeEncode = HexEncoding.ToString(array);
			    TobeEncode = PadString(TobeEncode, 24);
		    }
		    return TobeEncode;
	    }

	    private string EncodeDES(string TobeEncode)
	    {
		    string text = string.Empty;
		    SymmetricAlgorithm symmetricAlgorithm = DES.Create();
		    symmetricAlgorithm.GenerateIV();
		    symmetricAlgorithm.GenerateKey();
		    byte[] key = symmetricAlgorithm.Key;
		    byte[] iV = symmetricAlgorithm.IV;
		    if (!string.IsNullOrEmpty(TobeEncode))
		    {
			    TobeEncode = TobeEncode.Replace("_", "");
			    int discarded;
			    byte[] bytes = HexEncoding.GetBytes(TobeEncode, out discarded);
			    MemoryStream memoryStream = new MemoryStream();
			    CryptoStream cryptoStream = new CryptoStream(memoryStream, symmetricAlgorithm.CreateEncryptor(key, iV), CryptoStreamMode.Write);
			    cryptoStream.Write(bytes, 0, bytes.Length);
			    cryptoStream.Close();
			    byte[] array = memoryStream.ToArray();
			    memoryStream.Close();
			    text += HexEncoding.ToString(key);
			    text += HexEncoding.ToString(array);
			    text += HexEncoding.ToString(iV);
		    }
		    return text;
	    }

        public string DecodeDES(string TobeDecode)
        {
            string result = string.Empty;
            try
            {
                SymmetricAlgorithm symmetricAlgorithm = DES.Create();
                if (!string.IsNullOrEmpty(TobeDecode))
                {
                    TobeDecode = TobeDecode.Replace("-", "");
                    if (TobeDecode.Length > 32)
                    {
                        int discarded;
                        byte[] bytes = HexEncoding.GetBytes(TobeDecode.Substring(0, 16), out discarded);
                        byte[] bytes2 = HexEncoding.GetBytes(TobeDecode.Substring(TobeDecode.Length - 16), out discarded);
                        byte[] bytes3 = HexEncoding.GetBytes(TobeDecode.Substring(16, TobeDecode.Length - 32), out discarded);
                        if (bytes.Length == 8 && bytes2.Length == 8)
                        {
                            symmetricAlgorithm.Key = bytes;
                            symmetricAlgorithm.IV = bytes2;
                            MemoryStream memoryStream = new MemoryStream(bytes3);
                            CryptoStream cryptoStream = new CryptoStream(memoryStream, symmetricAlgorithm.CreateDecryptor(), CryptoStreamMode.Read);
                            byte[] array = new byte[bytes3.Length];
                            cryptoStream.Read(array, 0, bytes3.Length);
                            cryptoStream.Close();
                            memoryStream.Close();
                            result = HexEncoding.ToString(array);
                            return result;
                        }
                    }
                }
            }
            catch
            {
            }
            return result;
        }

        private string GetPropertyValue(ManagementObjectSearcher Srch, string prtName)
        {
            foreach (ManagementObject item in Srch.Get())
            {
                foreach (PropertyData property in item.Properties)
                {
                    if (property.Name == prtName)
                    {
                        return property.Value.ToString();
                    }
                }
            }
            return "";
        }
    }
}
