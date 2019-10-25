using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjectManagementSystem.Controllers;
using ProjectManagementSystem.Models;
using System.Linq;
using Xunit;

namespace ProjectManagementSystem.Test
{
    public class UsersControllerTest
    {
        [Fact]
        public async void GetUser_GetAllUsers_ShouldReturnThreeUsers()
        {
            var options = new DbContextOptionsBuilder<ProjectManagementSystemContext>()
                       .UseInMemoryDatabase(databaseName: "ProjectManagementSystem")
                       .Options;

            using (var context = new ProjectManagementSystemContext(options))
            {
                context.User.Add(new User { Username = "test1", Password = "test", Email = "test@test.com", Name = "Test", Surname = "Test", Role = "Developer" });
                context.User.Add(new User { Username = "test2", Password = "test", Email = "test@test.com", Name = "Test", Surname = "Test", Role = "Developer" });
                context.User.Add(new User { Username = "test3", Password = "test", Email = "test@test.com", Name = "Test", Surname = "Test", Role = "Developer" });
                context.SaveChanges();

                UsersController usersController = new UsersController(context);
                var result = await usersController.GetUser();
                var users = result.Value;

                Assert.Equal(3, users.Count());

                context.Database.EnsureDeleted();
            }
        }

        [Fact]
        public async void PostUser_AddExistingUsername_ShouldReturnConflictResult()
        {
            var options = new DbContextOptionsBuilder<ProjectManagementSystemContext>()
                       .UseInMemoryDatabase(databaseName: "ProjectManagementSystem")
                       .Options;

            using (var context = new ProjectManagementSystemContext(options))
            {
                context.User.Add(new User { Username = "test1", Password = "test", Email = "test@test.com", Name = "Test", Surname = "Test", Role = "Developer" });
                context.User.Add(new User { Username = "test2", Password = "test", Email = "test@test.com", Name = "Test", Surname = "Test", Role = "Developer" });
                context.User.Add(new User { Username = "test3", Password = "test", Email = "test@test.com", Name = "Test", Surname = "Test", Role = "Developer" });
                context.SaveChanges();

                UsersController usersController = new UsersController(context);
                var result = await usersController.PostUser(new User() { Username = "test1", Password = "test", Email = "test@test.com", Name = "Test", Surname = "Test", Role = "Developer" });

                Assert.IsType<ConflictResult>(result.Result);

                context.Database.EnsureDeleted();
            }
        }

        [Fact]
        public async void PutUser_ChangeEmail_ShouldReturnNoContentResult()
        {
            var options = new DbContextOptionsBuilder<ProjectManagementSystemContext>()
                       .UseInMemoryDatabase(databaseName: "ProjectManagementSystem")
                       .Options;

            using (var context = new ProjectManagementSystemContext(options))
            {
                context.User.Add(new User { Username = "test1", Password = "test", Email = "test@test.com", Name = "Test", Surname = "Test", Role = "Developer" });
                context.User.Add(new User { Username = "test2", Password = "test", Email = "test@test.com", Name = "Test", Surname = "Test", Role = "Developer" });
                context.User.Add(new User { Username = "test3", Password = "test", Email = "test@test.com", Name = "Test", Surname = "Test", Role = "Developer" });
                context.SaveChanges();

                UsersController usersController = new UsersController(context);
                var result = await usersController.PutUser("test1", new User() { Username = "test1", Password = "test", Email = "new@test.com", Name = "Test", Surname = "Test", Role = "Developer" });

                Assert.IsType<NoContentResult>(result);

                context.Database.EnsureDeleted();
            }
        }
    }
}
