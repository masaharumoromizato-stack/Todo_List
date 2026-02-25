FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    unzip \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    zip

# MySQL用PDO拡張
RUN docker-php-ext-install pdo pdo_mysql

# Composerインストール
RUN curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

# Apache rewrite有効化
RUN a2enmod rewrite

# DocumentRoot変更
RUN sed -i 's!/var/www/html!/var/www/html/src/public!g' /etc/apache2/sites-available/000-default.conf

WORKDIR /var/www/html
