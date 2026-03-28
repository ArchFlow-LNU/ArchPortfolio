using System;
namespace ArchPortfolio.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string? FullDescription { get; set; }
        public int Area { get; set; }
        public int Year { get; set; }

        public int CategoryId { get; set; }
        public ProjectCategory? Category { get; set; }

        public List<ProjectImage> Images { get; set; } = new();

        public bool IsBest { get; set; }
    }
}
