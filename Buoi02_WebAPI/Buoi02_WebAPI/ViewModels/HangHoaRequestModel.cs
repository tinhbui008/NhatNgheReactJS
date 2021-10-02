using System;
using System.ComponentModel.DataAnnotations;

namespace Buoi02_WebAPI.ViewModels
{
    public class HangHoaRequestModel
    {
        public string Search { get; set; }
        [Range(1, int.MaxValue)]
        public int? Size { get; set; }
        [Range(1, int.MaxValue)]
        public int Page { get; set; } = 1;
    }
}
