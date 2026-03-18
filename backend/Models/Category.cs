using System;

public class ProjectCategory
{
    public int Id { get; set; }
    public string Name { get; set; } = null!;
    public string? Description { get; set; }

    public ICollection<Project> Projects { get; set; } = new List<Project>();

}
