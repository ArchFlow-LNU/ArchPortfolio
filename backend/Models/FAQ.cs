namespace ArchPortfolio.Models
{
    public class FAQ
    {
        public int Id { get; set; }

        public string Question { get; set; } = null!;
        public string Answer { get; set; } = null!;

        public int Order { get; set; }  
    }
}