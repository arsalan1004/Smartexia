namespace backend.models.networkBand;

public class ProductNetworkBand
{
    public int id { get; set; }
    public int productId { get; set; }
    public int networkBandId { get; set; }
    
    // Navigation properties
    public NetworkBand networkBand { get; set; }
}