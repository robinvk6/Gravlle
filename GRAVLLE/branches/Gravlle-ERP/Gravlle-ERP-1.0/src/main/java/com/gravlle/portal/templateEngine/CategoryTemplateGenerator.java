package com.gravlle.portal.templateEngine;

import java.io.StringWriter;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.bind.annotation.XmlRootElement;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.gravlle.marketplace.amazon.annotations.GravlleAmazonVariationData;

@Service
public class CategoryTemplateGenerator {
	
	
	public Map<String,String> populate(Class clazz){
		
		Map<String, String> map = new HashMap<String, String>();
		try {
			Field productType = clazz.getDeclaredField("productType");
			
			Field[] innerFields = productType.getType().getDeclaredFields();
			for(Field type : innerFields){
				JSONObject jsonObject = new JSONObject();
				for(Field typeFields : type.getType().getDeclaredFields()){
					
					//System.out.println(typeFields.getName() + " ---  "+ typeFields.getType().getName());
					if(typeFields.getType().getName().contains("java.")){
						if(!typeFields.getType().getName().contains("java.util."))
						jsonObject.put(typeFields.getName(), typeFields.getType().getCanonicalName());
					}else{
						handleInnerObjects(typeFields,jsonObject);
					}
					
				}
				StringWriter out = new StringWriter();
				jsonObject.write(out);
			      
			      String jsonText = out.toString();
			      XmlRootElement element = type.getType().getAnnotation(XmlRootElement.class);
			      map.put(type.getName(), jsonText);
			      /*System.out.println(jsonText);
				System.out.println("***************************************");*/
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		
		return map;
	}
	
	private void handleVariationData(Field variation, JSONObject jsonObject){
		JSONObject variationData = new JSONObject();
		GravlleAmazonVariationData data = variation.getType().getAnnotation(GravlleAmazonVariationData.class);
		if(data != null){
		for(Field field : variation.getType().getDeclaredFields()){
			if(field.getName().equals("variationTheme")){
				variationData.put("variationTheme", data.variationTheme().split(","));
			}else{
				if(field.getType().getName().contains("java.")){
					if(!field.getType().getName().contains("java.util."))
					variationData.put(field.getName(), field.getType().getCanonicalName());
				}else{
					handleInnerObjects(field,variationData);
				}
			}
		}
		variationData.put("parentage", "parent,child".split(","));
		jsonObject.put("variationData", variationData);
	}
	}
	
	public void handleInnerObjects(Field innerField, JSONObject jsonObject){
		if("variationData".equals(innerField.getName())){
			handleVariationData(innerField,jsonObject);
		}else if (innerField.getType().isEnum()){
			jsonObject.put(innerField.getName(), handleEnums(innerField.getType().getDeclaredFields()));
		}
		else{
			JSONObject innerJSON = new JSONObject();
			for(Field typeFields : innerField.getType().getDeclaredFields()){
				if(typeFields.getType().isEnum()){
					innerJSON.put(typeFields.getName(), handleEnums(typeFields.getType().getDeclaredFields()));
				}else{
				innerJSON.put(typeFields.getName(), typeFields.getType().getCanonicalName());
				}
				
			}

			jsonObject.put(innerField.getName(), innerJSON);
			
		}
	}
	
	private List<String> handleEnums(Field[] fields){
		ArrayList<String> list = new ArrayList<String>();
		for(Field field : fields){
			if(!field.getName().equals("value") && !field.getName().equals("$VALUES")){
			list.add(field.getName());
			}
		}
		return list;
	}
	
	public Map<String,String> generateMiscTemplate() throws Exception{
		Map<String,String> map = new HashMap<String, String>();
		Class clazz = Class.forName("com.gravlle.marketplace.amazon.feed.domain.Miscellaneous");
		JSONObject variationData = new JSONObject();
		for(Field field : clazz.getDeclaredFields()){
			if(field.getType().getName().contains("java.")){
				if(!field.getType().getName().contains("java.util."))
				variationData.put(field.getName(), field.getType().getCanonicalName());
			}else{
				handleInnerObjects(field,variationData);
			}
		}
		StringWriter out = new StringWriter();
		variationData.write(out);
	      
	      String jsonText = out.toString();
	      map.put(clazz.getSimpleName(), jsonText);
		return map;
		
	}
	
	public static void main(String[] args) throws Exception {
		CategoryTemplateGenerator generator = new CategoryTemplateGenerator();
		//System.out.println(generator.generate(GravlleProduct.class));
		Map<String, String> generatedMap = generator.generateMiscTemplate();
		System.out.println(generatedMap);
	}
	
	
}
