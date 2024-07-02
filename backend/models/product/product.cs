using backend.models.category;

namespace backend.models.product;

public class product
{
    public int id { get; set; } // primary key
    public string name { get; set; }
    public string description { get; set; }
    public double price { get; set; }
    public int quantityAvailable { get; set; }
    public string imageUrl { get; set; }
    public int categoryId { get; set; }
    public int osId { get; set; }
    public int brandId { get; set; }
    public string subCategory { get; set; }
    
    // NAVIGATION PROPERTIES
    public brand.brand brand { get; set; }
    public Category category { get; set; }
    public operatingSystem.operatingSystem os { get; set; }
}