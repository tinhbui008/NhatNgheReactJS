using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Buoi02_WebAPI.ViewModels
{
    public class UserInfo
    {
        public string Username { get; set; }
        public string HoTen { get; set; }
        public string Token { get; set; }
        public List<string> Roles { get; set; }
    }
}
