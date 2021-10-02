using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Buoi02_WebAPI.ViewModels
{
    public class LoaiVM
    {
        public int MaLoai { get; set; }
        [Required]
        [MaxLength(50)]
        public string TenLoai { get; set; }
        public string MoTa { get; set; }
        public string Hinh { get; set; }
    }
}
