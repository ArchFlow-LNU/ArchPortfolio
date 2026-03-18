using System;

public class Project
{
    public int Id { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public int? Area { get; set; }
    public int? Year { get; set; }

    public int? CategoryId { get; set; }
    public Category? Category { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // JSON для фото (поки)
    public string? ImagesJson { get; set; }
    public ICollection<Review> Reviews { get; set; } = new List<Review>();

}
