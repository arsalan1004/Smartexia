using backend.data;
using Microsoft.EntityFrameworkCore;

namespace backend.services.productDetailsServices;

public class ProductFirmwareService
{
    private readonly smartexiaContext _smartexiaContext;

    public ProductFirmwareService(smartexiaContext smartexiaContext)
    {
        _smartexiaContext = smartexiaContext;
    }
    
    public Task<string> getProductFirmware(int productId)
    {
        try
        {
            string firmware = _smartexiaContext.ProductFirmware.Include(x=>x.firmware).Where(x => x.productId == productId).Select(x=>x.firmware.version).FirstOrDefault();
            
            if (firmware == null)
            {
                return null;
            }

            return Task.FromResult(firmware);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null;
        }
    }
}
