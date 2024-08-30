import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa'; // Import icons from react-icons

const ProductListItem = ({ product, index, onSave, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableProduct, setEditableProduct] = useState(product);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        // Reset editableProduct when product prop changes
        setEditableProduct(product);
    }, [product]);

    useEffect(() => {
        // Check if there are changes between editableProduct and original product
        const hasDifferences = JSON.stringify(editableProduct) !== JSON.stringify(product);
        setHasChanges(hasDifferences);
    }, [editableProduct, product]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Only handle changes to quantity
        if (name === 'quantity') {
            setEditableProduct((prevProduct) => ({
                ...prevProduct,
                quantity: value,
            }));
        }
    };

    const handleSave = () => {
        onSave(editableProduct);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    }

    return (
        <li
            key={product._id}
            className="grid grid-cols-10 items-center p-2 bg-white hover:bg-gray-50 transition-all duration-200"
        >
            <span className="font-medium text-gray-500">{index + 1}.</span>

            {isEditing ? (
                <>
                    <div className="text-sm text-gray-800">{product.productId?.year || 'N/A'}</div>
                    <div className="text-md text-gray-800">{product.productId?.make || 'N/A'}</div>
                    <div className="text-md text-gray-800">{product.productId?.model || 'N/A'}</div>
                    <div className="text-sm text-gray-600">{product.productId?.carPart || 'N/A'}</div>
                    <div className="text-sm text-gray-600">{product.productId?.variant || 'N/A'}</div>
                    <div className="text-xs text-gray-500">{product.productId?.specification || 'N/A'}</div>
                    <input
                        type="number"
                        name="quantity"
                        value={editableProduct.quantity || ''}
                        onChange={handleInputChange}
                        className="text-sm text-gray-800 p-1 border rounded-md"
                    />
                    {/* Status field is read-only */}
                    <div
                        className={`text-sm font-medium ${product.status === 'available' ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {product.status || 'Unknown'}
                    </div>
                </>
            ) : (
                <>
                    <div className="text-sm text-gray-800">{product.productId?.year || 'N/A'}</div>
                    <div className="text-md text-gray-800">{product.productId?.make || 'N/A'}</div>
                    <div className="text-md text-gray-800">{product.productId?.model || 'N/A'}</div>
                    <div className="text-sm text-gray-600">{product.productId?.carPart || 'N/A'}</div>
                    <div className="text-sm text-gray-600">{product.productId?.variant || 'N/A'}</div>
                    <div className="text-xs text-gray-500">{product.productId?.specification || 'N/A'}</div>
                    <div className="text-sm text-gray-800">{product.quantity || '0'}</div>
                    <div
                        className={`text-sm font-medium ${product.status === 'available' ? 'text-green-600' : 'text-red-600'}`}
                    >
                        {product.status || 'Unknown'}
                    </div>
                </>
            )}

            <div className="flex justify-end space-x-2">
                {isEditing ? (
                    <div className='flex'>
                        <button onClick={handleCancelEdit} className='text-xs text-red-500 pr-2 hover:underline'>cancel</button>
                        <button
                        onClick={handleSave}
                        className={`text-green-600 hover:text-green-800 ${!hasChanges ? 'cursor-not-allowed opacity-50' : ''}`}
                        title="Save"
                        disabled={!hasChanges}
                    >
                        <FaSave className="h-5 w-5" />
                    </button>    
                    </div>
                ) : (
                    <button
                        onClick={handleEdit}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                    >
                        <FaEdit className="h-5 w-5" />
                    </button>
                )}
                <button
                    onClick={() => onDelete(product._id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                >
                    <FaTrash className="h-5 w-5" />
                </button>
            </div>
        </li>
    );
};

export default ProductListItem;
