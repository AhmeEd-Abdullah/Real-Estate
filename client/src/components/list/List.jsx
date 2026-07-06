import "./list.scss";
import Card from "../card/Card";
import { listData } from "../../lib/dummydata";
import { useContext } from "react";
import { authContext } from "../../context/authContext";

function List() {
    const { currentUser } = useContext(authContext);
    const posts = currentUser.posts;

    return (
        <div className="list">
            {posts.map((item) => (
                <Card key={item.id} item={item} />
            ))}
        </div>
    );
}

export default List;
