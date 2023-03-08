using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace SampleApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConversionsController : ControllerBase
    {
        private static readonly Random Random = new Random();
        private static readonly byte[] Message = ASCIIEncoding.ASCII.GetBytes($"event:message\n");

        public ConversionsController()
        {
        }

        [HttpGet]
        [Route("base64stream/{input}")]
        public async Task ConvertStringToBase64StreamAsync([FromRoute] string input, CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(input))
            {
                throw new ArgumentNullException(nameof(input));
            }

            var stringByteArray = Encoding.UTF8.GetBytes(input);
            var base64string = Convert.ToBase64String(stringByteArray);
            var base64charArray = base64string.ToCharArray();

            Response.Headers.Add("Content-Type", "text/event-stream");

            byte[] data;
            foreach (var base64char in base64charArray)
            {
                await Task.Delay(TimeSpan.FromSeconds(Random.Next(1, 5)));
                data = ASCIIEncoding.ASCII.GetBytes($"data:{base64char}\n\n");
                await Response.Body.WriteAsync(Message, 0, Message.Length, cancellationToken);
                await Response.Body.WriteAsync(data, 0, data.Length, cancellationToken);
                await Response.Body.FlushAsync(cancellationToken);
            }
        }
    }
}
