using Microsoft.AspNetCore.Http;
using System;
using System.IO;

namespace Buoi02_WebAPI.ViewModels
{
    public class MyTools
    {
        public static string GetRealUrl(string folder, string fileName, HttpRequest request)
        {
            var fullUrl = Path.Combine(
                //Thư mục gốc
                Directory.GetCurrentDirectory(),
                "wwwroot", "Hinh", folder, fileName
                );
            if (File.Exists(fullUrl))
            {
                return $"{request.Scheme}://{request.Host}/Hinh/{folder}/{fileName}";
            }
            return $"{request.Scheme}://{request.Host}/Hinh/no-image.png";
        }

        public static string GetImageBase64(string folder, string fileName)
        {
            var fullUrl = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot", "Hinh", folder, fileName
                );
            if (!File.Exists(fullUrl))
            {
                fullUrl = Path.Combine(
                Directory.GetCurrentDirectory(),
                "wwwroot", "Hinh", "no-image.png"
                );
            }
            var imageBytes = File.ReadAllBytes(fullUrl);
            return Convert.ToBase64String(imageBytes);
        }
    }
}
