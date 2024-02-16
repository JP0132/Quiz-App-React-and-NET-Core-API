using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuizAPI.Models;

namespace QuizAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public CategoriesController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            var allCategories = await _context.Categories.ToListAsync();
       
            return Ok(allCategories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound(); // Return HTTP 404 Not Found if category with the given ID is not found
            }

            return category; // Return HTTP 200 OK with the category object if found
        }

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Question>> PostCategory(Category category)
        {
            if (_context.Categories == null)
            {
                return Problem("Entity set 'QuizDbContext.Category'  is null.");
            }



            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategory), new { id = category.CategoryID }, category);

            /*return CreatedAtAction("GetQuestion", new { id = question.QuestionID }, question);*/
        }

        /*  // GET: api/Categories/5
          [HttpGet("{id}")]
          public async Task<ActionResult<Question>> GetCategory(int id)
          {
              if (_context.Categories == null)
              {
                  return NotFound();
              }
              var category = await _context.Categories.FindAsync(id);

              if (category == null)
              {
                  return NotFound();
              }

              return category;
          }*/

        /*// PUT: api/Questions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuestion(int id, Question question)
        {
            if (id != question.QuestionID)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }*/
    }
}
