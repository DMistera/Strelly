using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Strelly {
    public class ApplicationUserDTO {
        public long Id { get; set; }
        public string UserName { get; set; }

        public ApplicationUserDTO(ApplicationUser applicationUser) {
            Id = applicationUser.Id;
            UserName = applicationUser.UserName;
        }
    }
}
