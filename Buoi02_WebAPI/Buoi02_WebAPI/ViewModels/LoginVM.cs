
using System.ComponentModel.DataAnnotations;

namespace Buoi02_WebAPI.ViewModels
{
    public class LoginVM
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [MinLength(4)]
        public string Password { get; set; }
    }
}
