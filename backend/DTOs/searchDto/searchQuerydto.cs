namespace ApiDependencies.DTOs.searchDto;

public class searchQuerydto
{
    public string searchQuery { get; set; }
    public subCategorydto filters { get; set; }
    public priceRangedto priceRange { get; set; }
}

