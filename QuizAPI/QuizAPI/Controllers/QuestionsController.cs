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
    public class QuestionsController : ControllerBase
    {
        private readonly QuizDbContext _context;

        public QuestionsController(QuizDbContext context)
        {
            _context = context;
        }

        // GET: api/Questions/{categoryID}
        [HttpGet]
        [Route("GetQuestions/{categoryID}")]
        public async Task<ActionResult<IEnumerable<Question>>> GetQuestions(int categoryID)
        {
          var randomFiveQuestions = await(_context.Questions
                .Where(q => q.CategoryID == categoryID)
                .Select(x => new {
                    QuestionID = x.QuestionID,
                    QuestionName = x.QuestionName,
                    ImageName = x.ImageName,
                    Options = new string[] {x.Option1, x.Option2, x.Option3, x.Option4}
                })
                .OrderBy(y => Guid.NewGuid())
                .Take(5)
                ).ToListAsync();
                
            return Ok(randomFiveQuestions);
        }

        // GET: api/Questions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Question>>> GetAllQuestions()
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }

            var questions = _context.Questions;

            return Ok(questions);
        }

        // GET: api/Questions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> GetQuestion(int id)
        {
          if (_context.Questions == null)
          {
              return NotFound();
          }
            var question = await _context.Questions.FindAsync(id);

            if (question == null)
            {
                return NotFound();
            }

            return question;
        }

        /*[HttpGet]
        [Route("GetImage/{imageName}")]
        public async Task<ActionResult<Question>> GetImage(string imageName)
        {
            // Construct the full path to the image file
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Images", imageName);

            if (!System.IO.File.Exists(imagePath))
            {
                return NotFound(); // Image not found
            }

            // Read the image file
            var imageStream = System.IO.File.OpenRead(imagePath);

            // Return the image with the correct content type
            return File(imageStream, "image/jpg");
        }*/

        // PUT: api/Questions/5
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
        }

        // POST: api/Questions/GetAnswers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("GetAnswers")]
        public async Task<ActionResult<Question>> RetrieveAnswers(int[] questionIDs)
        {
            var answers = await _context.Questions
                .Where(x => questionIDs.Contains(x.QuestionID))
                .Select(y => new
                {
                    QuestionID = y.QuestionID,
                    QuestionName = y.QuestionName,
                    ImageName = y.ImageName,
                    Options = new string[] { y.Option1, y.Option2, y.Option3, y.Option4 },
                    Answer=y.Answer,
                }).ToListAsync();
              
                
            return Ok(answers);
        }

        // POST: api/Questions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Route("NewQuestion")]
        public async Task<ActionResult<Question>> PostQuestion(Question question)
        {
          if (_context.Questions == null)
          {
              return Problem("Entity set 'QuizDbContext.Questions'  is null.");
          }



           _context.Questions.Add(question);
           await _context.SaveChangesAsync();

            return Ok(question);

            /*return CreatedAtAction("GetQuestion", new { id = question.QuestionID }, question);*/
        }

        // DELETE: api/Questions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuestion(int id)
        {
            if (_context.Questions == null)
            {
                return NotFound();
            }
            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool QuestionExists(int id)
        {
            return (_context.Questions?.Any(e => e.QuestionID == id)).GetValueOrDefault();
        }
    }
}
