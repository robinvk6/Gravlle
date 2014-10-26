package com.gravlle.portal.templateEngine;

import java.util.Map;

public class FieldTemplate<T> {
	private String field;
	private boolean required;
	private Class<?> type;
	private boolean enumerated;
	private T[] enumValues;
	private boolean list;
	private boolean newTree;
	private Map<String, Object> treeValue;
	private Object value;
	
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public boolean isRequired() {
		return required;
	}
	public void setRequired(boolean required) {
		this.required = required;
	}
	public Class<?> getType() {
		return type;
	}
	public void setType(Class<?> type) {
		this.type = type;
	}
	@Override
	public String toString() {
		return "FieldTemplate [field=" + field + ", required=" + required
				+ ", type=" + type + "]";
	}
	public boolean isEnumerated() {
		return enumerated;
	}
	public void setEnumerated(boolean enumerated) {
		this.enumerated = enumerated;
	}
	public T[] getEnumValues() {
		return enumValues;
	}
	public void setEnumValues(T[] enumValues) {
		this.enumValues = enumValues;
	}
	public boolean isList() {
		return list;
	}
	public void setList(boolean list) {
		this.list = list;
	}
	public boolean isNewTree() {
		return newTree;
	}
	public void setNewTree(boolean newTree) {
		this.newTree = newTree;
	}
	public Map<String, Object> getTreeValue() {
		return treeValue;
	}
	public void setTreeValue(Map<String, Object> treeValue) {
		this.treeValue = treeValue;
	}
	public Object getValue() {
		return value;
	}
	public void setValue(Object value) {
		this.value = value;
	}
	
	
}
