using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Strelly {

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase {

        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly ApplicationDbContext dbContext;

        public UsersController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext) {
            this.signInManager = signInManager;
            this.userManager = userManager;
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<ApplicationUserDTO>> GetLoggedUser() {
            var user = await userManager.GetUserAsync(User);
            if (user == null) {
                return Unauthorized();
            } else {
                return Ok(new ApplicationUserDTO(user));
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApplicationUserDTO>> GetUser(long id) {
            var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) {
                return NotFound();
            } else {
                return Ok(new ApplicationUserDTO(user));
            }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginModel model) {

            if (!(await UsernameTaken(model.UserName))) {
                ModelState.AddModelError("username", "User does not exist");
                return new ValidationFailedResult(ModelState, StatusCodes.Status400BadRequest);
            }
            Microsoft.AspNetCore.Identity.SignInResult result = await signInManager.PasswordSignInAsync(model.UserName, model.Password, true, false);
            if (result.Succeeded) {
                return Ok();
            } else {
                ModelState.AddModelError("password", "Password is incorrect");
            }
            return new ValidationFailedResult(ModelState, StatusCodes.Status400BadRequest);
        }

        [HttpDelete("Logout")]
        public async Task<IActionResult> Logout() {
            await signInManager.SignOutAsync();
            return Ok();
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterModel register) {
            ApplicationUser user = register.CreateUser();

            IdentityResult result = await userManager.CreateAsync(
                user,
                register.Password
            );
            if (!result.Succeeded) {
                foreach (IdentityError error in result.Errors) {
                    string field = error.Code.Contains("password", System.StringComparison.CurrentCultureIgnoreCase) ? "password" : "username";
                    ModelState.AddModelError(field, error.Description);
                }
                return new ValidationFailedResult(ModelState, StatusCodes.Status400BadRequest);
            }
            return Ok();
        }

        private async Task<bool> UsernameTaken(string username) {
            return await userManager.FindByNameAsync(username) != null;
        }
    }
}
