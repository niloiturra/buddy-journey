using System;
using System.Text;

namespace BuddyJourneyIdentityApi.Utils
{
    public static class CryptoString
    {
        public static string Encrypt(string encryptString)   
        {  
            var b = Encoding.ASCII.GetBytes(encryptString);  
            var encrypted = Convert.ToBase64String(b);  
            return encrypted; 
        }  
  
        public static string Decrypt(string cipherText)   
        {
            string decrypted;  
            try
            {
                var b = Convert.FromBase64String(cipherText);
                decrypted = Encoding.ASCII.GetString(b);
            }  
            catch (FormatException fe)   
            {  
                decrypted = "";  
            } 
            
            return decrypted; 
        }  
    }
}