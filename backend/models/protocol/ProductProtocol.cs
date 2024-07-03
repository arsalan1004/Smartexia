namespace backend.models.protocol;

public class ProductProtocol
{
    public int id { get; set; }
    public int productId { get; set; }
    public int protocolId { get; set; }
    
    // Navigation properties
    public Protocol protocol { get; set; }
}