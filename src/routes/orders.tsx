import "./orders.css";

export const Orders = () =>  
<div className="orders-container">
    <div className="empty-state">
    <img
        src="/EmptyState.png"
        alt="No orders"
        className="empty-state-image"
    />
    <h2>No orders yet</h2>
    <p>There's currently no orders placed</p>
    </div>
</div>;


