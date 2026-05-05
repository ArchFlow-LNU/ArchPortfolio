using Xunit;
using Microsoft.AspNetCore.Mvc;
using ArchPortfolio.Controllers;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;
using Moq;
using Microsoft.AspNetCore.Hosting;
using System.Text;

namespace ArchProjectBackend.Tests
{
    public class UploadControllerTests
    {
        //helper для файлу
        private IFormFile CreateFakeFile()
        {
            var content = "Hello world";
            var stream = new MemoryStream(Encoding.UTF8.GetBytes(content));

            return new FormFile(stream, 0, stream.Length, "file", "test.txt")
            {
                Headers = new HeaderDictionary(),
                ContentType = "text/plain"
            };
        }

        // helper для env
        private IWebHostEnvironment CreateEnv(string path)
        {
            var mock = new Mock<IWebHostEnvironment>();
            mock.Setup(e => e.WebRootPath).Returns(path);
            return mock.Object;
        }

        // ================== NULL FILE ==================
        [Fact]
        public async Task Upload_ShouldReturnBadRequest_WhenFileIsNull()
        {
            var env = CreateEnv(Path.GetTempPath());
            var controller = new UploadController(env);

            var result = await controller.Upload(null);

            Assert.IsType<BadRequestResult>(result);
        }

        // ================== SUCCESS ==================
        [Fact]
        public async Task Upload_ShouldSaveFile_AndReturnOk()
        {
            var tempPath = Path.Combine(Path.GetTempPath(), "test_uploads");

            var env = CreateEnv(tempPath);
            var controller = new UploadController(env);

            var file = CreateFakeFile();

            var result = await controller.Upload(file);

            var ok = Assert.IsType<OkObjectResult>(result);

            Assert.NotNull(ok.Value);

            // перевірка що файл реально створився
            var uploadDir = Path.Combine(tempPath, "uploads");
            Assert.True(Directory.Exists(uploadDir));

            // cleanup (щоб не засмічувати систему)
            Directory.Delete(uploadDir, true);
        }
    }
}