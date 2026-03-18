using System;
namespace ArchPortfolio.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public int Area { get; set; }
        public int Year { get; set; }

        public int CategoryId { get; set; }
        public ProjectCategory? Category { get; set; }
    }
}
