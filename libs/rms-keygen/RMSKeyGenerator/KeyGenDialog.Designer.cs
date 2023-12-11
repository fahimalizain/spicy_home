namespace RMSKeyGenerator
{
    partial class KeyGenDialog
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label1 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.processorId_TextBox = new System.Windows.Forms.TextBox();
            this.diskDriveSig_TextBox = new System.Windows.Forms.TextBox();
            this.clientCode_TextBox = new System.Windows.Forms.TextBox();
            this.generateKey_Button = new System.Windows.Forms.Button();
            this.generatedKey1_TextBox = new System.Windows.Forms.TextBox();
            this.generatedKey2_TextBox = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(9, 16);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(68, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "Processor ID";
            this.label1.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(216, 16);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(104, 13);
            this.label3.TabIndex = 2;
            this.label3.Text = "Disk Drive Signature";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(12, 59);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(61, 13);
            this.label2.TabIndex = 4;
            this.label2.Text = "Client Code";
            // 
            // processorId_TextBox
            // 
            this.processorId_TextBox.Location = new System.Drawing.Point(12, 32);
            this.processorId_TextBox.Name = "processorId_TextBox";
            this.processorId_TextBox.ReadOnly = true;
            this.processorId_TextBox.Size = new System.Drawing.Size(187, 20);
            this.processorId_TextBox.TabIndex = 6;
            // 
            // diskDriveSig_TextBox
            // 
            this.diskDriveSig_TextBox.Location = new System.Drawing.Point(219, 32);
            this.diskDriveSig_TextBox.Name = "diskDriveSig_TextBox";
            this.diskDriveSig_TextBox.ReadOnly = true;
            this.diskDriveSig_TextBox.Size = new System.Drawing.Size(187, 20);
            this.diskDriveSig_TextBox.TabIndex = 7;
            // 
            // clientCode_TextBox
            // 
            this.clientCode_TextBox.Location = new System.Drawing.Point(12, 75);
            this.clientCode_TextBox.Name = "clientCode_TextBox";
            this.clientCode_TextBox.ReadOnly = true;
            this.clientCode_TextBox.Size = new System.Drawing.Size(187, 20);
            this.clientCode_TextBox.TabIndex = 8;
            // 
            // generateKey_Button
            // 
            this.generateKey_Button.Location = new System.Drawing.Point(263, 72);
            this.generateKey_Button.Name = "generateKey_Button";
            this.generateKey_Button.Size = new System.Drawing.Size(100, 23);
            this.generateKey_Button.TabIndex = 9;
            this.generateKey_Button.Text = "Generate Key";
            this.generateKey_Button.UseVisualStyleBackColor = true;
            this.generateKey_Button.Click += new System.EventHandler(this.generateKey_Button_Click);
            // 
            // generatedKey1_TextBox
            // 
            this.generatedKey1_TextBox.Location = new System.Drawing.Point(12, 121);
            this.generatedKey1_TextBox.Name = "generatedKey1_TextBox";
            this.generatedKey1_TextBox.Size = new System.Drawing.Size(394, 20);
            this.generatedKey1_TextBox.TabIndex = 10;
            // 
            // generatedKey2_TextBox
            // 
            this.generatedKey2_TextBox.Location = new System.Drawing.Point(12, 160);
            this.generatedKey2_TextBox.Name = "generatedKey2_TextBox";
            this.generatedKey2_TextBox.Size = new System.Drawing.Size(394, 20);
            this.generatedKey2_TextBox.TabIndex = 11;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(9, 105);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(27, 13);
            this.label4.TabIndex = 12;
            this.label4.Text = "PK1";
            this.label4.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(12, 144);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(27, 13);
            this.label5.TabIndex = 13;
            this.label5.Text = "PK2";
            this.label5.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            // 
            // KeyGenDialog
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(418, 202);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.generatedKey2_TextBox);
            this.Controls.Add(this.generatedKey1_TextBox);
            this.Controls.Add(this.generateKey_Button);
            this.Controls.Add(this.clientCode_TextBox);
            this.Controls.Add(this.diskDriveSig_TextBox);
            this.Controls.Add(this.processorId_TextBox);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label1);
            this.MaximizeBox = false;
            this.Name = "KeyGenDialog";
            this.ShowIcon = false;
            this.SizeGripStyle = System.Windows.Forms.SizeGripStyle.Hide;
            this.Text = "RMS Key Generator";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox processorId_TextBox;
        private System.Windows.Forms.TextBox diskDriveSig_TextBox;
        private System.Windows.Forms.TextBox clientCode_TextBox;
        private System.Windows.Forms.Button generateKey_Button;
        private System.Windows.Forms.TextBox generatedKey1_TextBox;
        private System.Windows.Forms.TextBox generatedKey2_TextBox;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
    }
}

