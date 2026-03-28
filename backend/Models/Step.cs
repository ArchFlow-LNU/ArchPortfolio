namespace ArchPortfolio.Models
{
    public class Step
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string? Image { get; set; } = null!;
    }
}