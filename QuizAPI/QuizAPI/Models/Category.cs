using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuizAPI.Models
{
    public class Category
    {
        [Key]
        public int CategoryID { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string CategoryName { get; set; }

    }
}
