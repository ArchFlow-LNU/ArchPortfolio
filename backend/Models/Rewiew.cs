using System;

public class Review
{
    public int Id { get; set; }
    public string AuthorName { get; set; } = null!;
    public string? AuthorEmail { get; set; }
    public int? Rating { get; set; }
    public string Message { get; set; } = null!;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool Approved { get; set; } = false;

    public int? ProjectId { get; set; }
    public Project? Project { get; set; }
}
