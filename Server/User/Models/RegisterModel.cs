﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Strelly {
    public class RegisterModel {

        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }

        public ApplicationUser CreateUser() {
            return new ApplicationUser {
                UserName = UserName,
            };
        }
    }
}
