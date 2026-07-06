// import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { useContext } from "react";
import { authContext } from "../../context/authContext";

function ListPage() {
    const { currentUser } = useContext(authContext);
    const posts = currentUser.posts;
    // const data = listData;

    return (
        <div className="listPage">
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    {posts.map((post) => (
                        <Card key={post.id} item={post} />
                    ))}
                </div>
            </div>
            <div className="mapContainer">
                <Map items={posts} />
            </div>
        </div>
    );
}

export default ListPage;
