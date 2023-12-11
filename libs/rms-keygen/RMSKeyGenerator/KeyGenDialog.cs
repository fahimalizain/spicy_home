using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Security;

namespace RMSKeyGenerator
{
    public partial class KeyGenDialog : Form
    {
        SecurityUtils utils = new SecurityUtils();
        String processorId;
        String diskDriveSignature;
        String clientCode;

        public KeyGenDialog()
        {
            InitializeComponent();
            this.loadSystemInfo();
        }

        void loadSystemInfo()
        {
            this.processorId = utils.GetProcessorID();
            this.diskDriveSignature = utils.GetDiskDriveSignature();
            this.clientCode = utils.GetClientCode();

            processorId_TextBox.Text = this.processorId;
            diskDriveSig_TextBox.Text = this.diskDriveSignature;
            clientCode_TextBox.Text = this.clientCode;
        }

        private void generateKey_Button_Click(object sender, EventArgs e)
        {
            SecurityManager manager = new SecurityManager();
            String key = manager.GeneratePermanantKey(this.clientCode, "D");

            int split = 39;

            generatedKey1_TextBox.Text = key.Substring(0, split);
            generatedKey2_TextBox.Text = key.Substring(split + 1);
        }
    }
}
