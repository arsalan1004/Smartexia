using backend.models.operatingSystem;

namespace backend.models.hub;

public class hub
{
    public int id { get; set; }
    public string name { get; set; }
    public int osId { get; set; }
    
    // Navigation properties
    public operatingSystem.operatingSystem os { get; set; }
}