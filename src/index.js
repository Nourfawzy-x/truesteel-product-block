import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import "./style.scss";

registerBlockType("create-block/truesteel-product-block", {
	apiVersion: 2,
	title: "product-block",
	icon: "list-view",
	category: "widgets",
	attributes: {
		title: {
			type: "string",
			source: "html",
			selector: "h5",
		},
		items: {
			type: "array",
			default: [],
		},
	},
	edit({ attributes, setAttributes }) {
		const [newItem, setNewItem] = useState("");
		const [newDescription, setNewDescription] = useState("");

		const addItem = () => {
			if (newItem.trim() && newDescription.trim()) {
				setAttributes({
					items: [
						...attributes.items,
						{ text: newItem, description: newDescription },
					],
				});
				setNewItem("");
				setNewDescription("");
			}
		};

		const removeItem = (index) => {
			const updatedItems = attributes.items.filter(
				(_, itemIndex) => itemIndex !== index,
			);
			setAttributes({ items: updatedItems });
		};

		return (
			<div {...useBlockProps()}>
				<RichText
					tagName="h5"
					value={attributes.title}
					onChange={(newTitle) => setAttributes({ title: newTitle })}
					placeholder="Enter list title"
				/>
				<ul>
					{attributes.items.map((item, index) => (
						<li key={index}>
							<div>
								<span className="item-text">{item.text}</span>
								<span className="item-description">: {item.description}</span>
							</div>
							<button onClick={() => removeItem(index)} className="btn1">
								Remove
							</button>
						</li>
					))}
				</ul>
				<div className="input-items">
					<div>
						<input
							type="text"
							value={newItem}
							onChange={(e) => setNewItem(e.target.value)}
							placeholder="Item title"
						/>
						<textarea
							type="text"
							value={newDescription}
							onChange={(e) => setNewDescription(e.target.value)}
							placeholder="Item description"
						></textarea>
					</div>
					<button onClick={addItem} className="btn2">
						Add
					</button>
				</div>
			</div>
		);
	},
	save({ attributes }) {
		return (
			<div {...useBlockProps.save()}>
				<RichText.Content tagName="h5" value={attributes.title} />
				<ul>
					{attributes.items.map((item, index) => (
						<li key={index}>
							<div>
								<span className="item-text">{item.text}</span>
								<span className="item-description">: {item.description}</span>
							</div>
						</li>
					))}
				</ul>
			</div>
		);
	},
});
