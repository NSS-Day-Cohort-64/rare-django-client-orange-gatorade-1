import { Link } from "react-router-dom"

export const Tag = ({ tag }) => (
    <section className="tag">
        <h3 className="tag__label">
            <Link to={`/tags/${tag.id}`}>
                { tag.label }
            </Link>
        </h3>
        {/* <div className="tag__label">{ tag.label }</div> */}
    </section>
)
