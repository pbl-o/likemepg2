import TrashIcon from "./icons/TrashIcon";
import HeartIcon from "./icons/heart-solid";

export default function CardPost({ post, deletePostById, likePostById }) {
  return (
    <article className="card col-12 col-sm-6 col-md-4 col-lg-3 mb-1">
      <img
        src={post.img}
        alt={post.descripcion}
        className="custom-img card-img-top"
      />
      <div className="card-body">
        <h5 className="fw-bolder">{post.titulo}</h5>
        <p>{post.descripcion}</p>
        <div className="d-flex mt-3 justify-content-between align-items-center">
          <div>
            <HeartIcon
              fill="red"
              height="25"
              onClick={() => {
                likePostById(post.id);
              }}
              className="cursor-pointer"
            />
            <span className="ms-2">{post.likes}</span>
          </div>
          <div>
            <TrashIcon
              fill="red"
              height="25"
              onClick={() => {
                deletePostById(post.id);
              }}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
