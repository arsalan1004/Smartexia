using backend.models.firmware;
using backend.models.product;
using Supabase.Postgrest.Attributes;

namespace ApiDependencies.models.productFirmware;

public class ProductFirmware
{
    [Column("id")]
    public int id { get; set; }
    [Column("productId")]
    public int productId { get; set; }
    [Column("firmwareId")]
    public int firmwareId { get; set; }
    
    // Navigation properties
    public product product { get; set; }
    public Firmware firmware { get; set; }
}