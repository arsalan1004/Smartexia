using Microsoft.EntityFrameworkCore;

namespace backend.models.category;

public class Category
{
    public int id { get; set; }
    public string name { get; set; }
    public string description { get; set; }
    
}