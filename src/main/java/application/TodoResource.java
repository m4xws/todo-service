package application;

import domain.Todo;
import domain.TodoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonObject;
import javax.validation.constraints.NotNull;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/todos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class TodoResource {
  private static final Logger LOG = LoggerFactory.getLogger(TodoResource.class);

  @Inject
  private TodoService todoService;

  public TodoResource() {
  }

  public TodoResource(final TodoService todoService) {
    this.todoService = todoService;
  }

  @GET
  public Response getTodos() {
    List<Todo> list = todoService.listTodo();
    return Response.ok().entity(list).build();
  }

  @GET
  @Path("/{todoId}")
  public Response getTodoById(@PathParam("todoId") @NotNull int todoId) {
    try {
      LOG.info("Find todo by id: {}", todoId);
      return Response.ok().entity(todoService.getTodoById(todoId)).build();
    } catch (IllegalArgumentException e) {
      LOG.warn("Could not find todo by id: {}", todoId);
      return Response.status(Response.Status.NOT_FOUND).build();
    }
  }

  @POST
  public Response addTodo(Todo todo) {
    LOG.info("Create new todo");
    todoService.addTodo(todo);
    JsonObject jsonResponse = Json.createObjectBuilder().add("uri", "/api/todos/" + todo.getId()).build();
    return Response.status(Response.Status.CREATED).entity(jsonResponse).build();
  }
}
