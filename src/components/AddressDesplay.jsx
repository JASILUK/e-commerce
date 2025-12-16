export default function AddressDisplay({ address, onChangeClick }) {
  if (!address) {
    return (
      <div className="p-3 border rounded">
        <p>No default address found</p>
        <button className="btn btn-primary" onClick={onChangeClick}>
          Add Address
        </button>
      </div>
    );
  }

  return (
    <div className="p-3 border rounded">
      <h5>Deliver To</h5>
      <p>
        <strong>{address.full_name}</strong> <br />
        {address.address_line}, {address.city}, {address.state} - {address.pincode}
      </p>

      <button className="btn btn-link p-0" onClick={onChangeClick}>
        Change
      </button>
    </div>
  );
}
