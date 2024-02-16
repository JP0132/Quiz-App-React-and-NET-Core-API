using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuizAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;




namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public AdminsController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Admins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Admin>>> GetAllAdmins()
        {
            if (_context.Admins == null)
            {
                return NotFound();
            }
            return await _context.Admins.ToListAsync();
        }


        //Logs the admin by returning the details of the admin
        // Post: api/Admins/
        [HttpPost]
        public async Task<ActionResult<object>> LoginAdmin(Admin admin)
        {
            if (_context.Admins == null)
            {
                return NotFound();
            }

            var temp = _context.Admins
                .Where(x => x.Name == admin.Name && x.Email == admin.Email).FirstOrDefault();

            if (temp != null)
            {
                if (!BCrypt.Net.BCrypt.EnhancedVerify(admin.Password, temp.Password))
                {
                    return Unauthorized();
                }
                admin = temp;
            }


            return Ok(new {admin.Name, admin.Email});
        }

        // GET: api/Admins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> GetAdmin(int id)
        {
            if (_context.Participants == null)
            {
                return NotFound();
            }
            var admin = await _context.Admins.FindAsync(id);

            if (admin == null)
            {
                return NotFound();
            }

            return admin;
        }
    }
}
