namespace ArchPortfolio.Models
{
    public class ProjectImage
    {
        public int Id { get; set; }

        public int ProjectId { get; set; }
        public Project? Project { get; set; };

        public string ImageUrl { get; set; } = null!;

        public bool IsMain { get; set; } = false;
    }
}