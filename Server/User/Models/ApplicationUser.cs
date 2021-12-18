using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Strelly {
    public class ApplicationUser : IdentityUser<long> {
        public ICollection<Task> AssignedTasks { get; set; }
    }
}
