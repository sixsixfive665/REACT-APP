import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Lockr from 'lockr/index'

const Demo = () => {
  const editorObj = {
    height: '800px',
    language: 'zh_CN',
    // language_url: '翻译中文的路径，我尝试很多种方法都不成功，最后叫后台的老哥放进项目的服务器上了，用的线上地址',
    plugins: 'table lists link image preview code',
    toolbar: `formatselect | code | preview | bold italic strikethrough forecolor backcolor | 
    link image | alignleft aligncenter alignright alignjustify  | 
    numlist bullist outdent indent`,
    relative_urls: false,
    file_picker_types: 'image',
    images_upload_url: '上传地址',
    image_advtab: true,
    image_uploadtab: true,
    images_upload_handler: (blobInfo, success, failure) => {
      //这里写你上传图片的方法
      var xhr, formData;
      var file = blobInfo.blob();//转化为易于理解的file对象
      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', '上传地址');
      xhr.setRequestHeader('Authorization', 'Bearer ' + Lockr.get('token'))
      xhr.onload = function () {
        var json;
        if (xhr.status !== 200) {
          failure('HTTP Error: ' + xhr.status);
          return;
        }
        json = JSON.parse(xhr.responseText);
        json.location = json.data.absoluteUri
        if (!json || typeof json.location != 'string') {
          failure('Invalid JSON: ' + xhr.responseText);
          return;
        }
        success(json.location);
      };
      formData = new FormData();
      formData.append('FileType', 1);
      formData.append('file', file, file.name);//此处与源文档不一样
      xhr.send(formData);
    }
  }

  function handleEditorChange(content, editor) {
    console.log(content);
  }
  return (
    <div>
      <Editor
        inline={false}
        selector='editorStateRef'  // 选择器
        apiKey='zubp16mwq97veomioggo3hgez95tslsv3dlrp2npryy4g8xb'
        init={{ ...editorObj }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default Demo;
