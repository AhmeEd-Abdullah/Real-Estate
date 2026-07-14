import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { useLoaderData } from "react-router-dom";
import { Await } from "react-router";
import { Suspense } from "react";
import LoaderIndicator from "../../components/loaderIndicator/LoaderIndicator";

function ListPage() {
    const { posts } = useLoaderData();

    return (
        <div className="listPage">
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    <Suspense
                        fallback={
                            <LoaderIndicator text="Loading properties..." />
                        }
                    >
                        <Await resolve={posts}>
                            {(value) =>
                                value.data.data.length ? (
                                    value.data.data.map((post) => (
                                        <Card key={post.id} item={post} />
                                    ))
                                ) : (
                                    <p className="noProperties">
                                        No properties found.
                                    </p>
                                )
                            }
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="mapContainer">
                <Suspense
                    fallback={<LoaderIndicator text="Loading map data..." />}
                >
                    <Await resolve={posts}>
                        {(value) => <Map items={value.data.data} />}
                    </Await>
                </Suspense>
            </div>
        </div>
    );
}

export default ListPage;
