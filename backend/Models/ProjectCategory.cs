namespace ArchPortfolio.Models
{
    public class ProjectCategory
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public ICollection<Project> Projects { get; set; } = new List<Project>();
    }
}
