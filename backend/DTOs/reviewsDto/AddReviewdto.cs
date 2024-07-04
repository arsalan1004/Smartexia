namespace ApiDependencies.DTOs.reviewsDto;

public class AddReviewdto
{
    public int rating { get; set; }
    public string comment { get; set; }
    public int userId { get; set; }
    public int productId { get; set; }
}