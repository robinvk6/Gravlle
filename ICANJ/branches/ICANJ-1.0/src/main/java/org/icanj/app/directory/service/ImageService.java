package org.icanj.app.directory.service;

import org.icanj.app.directory.dao.DirectoryDao;
import org.icanj.app.directory.entity.ImageModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageService {
	private static final Logger logger = LoggerFactory
			.getLogger(ImageService.class);
	
	@Autowired
	private DirectoryDao directoryhibernateDao;
	
	public String getResourceUrl(long key, String keyType){
		ImageModel imageModel = directoryhibernateDao.getResourceUrl(key, keyType);
		return imageModel != null ? imageModel.getResourceUrl() : "";
	}

}
