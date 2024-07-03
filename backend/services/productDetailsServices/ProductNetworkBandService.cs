using backend.data;
using Microsoft.EntityFrameworkCore;

namespace ApiDependencies.services.productDetailsServices;

public class ProductNetworkBandService
{
    private readonly smartexiaContext _smartexiaContext;

    public ProductNetworkBandService(smartexiaContext smartexiaContext)
    {
        _smartexiaContext = smartexiaContext;
    }
    
    public Task<string> getProductNetworkBand(int productId)
    {
        try
        {
            string band = _smartexiaContext.ProductNetworkBand.Where(x => x.productId == productId).Include(x=>x.networkBand).Select(x=>x.networkBand.bandName).FirstOrDefault();
            
            if (band == null)
            {
                return null;
            }

            return Task.FromResult(band);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null;
        }
    }
}